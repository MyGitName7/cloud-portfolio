const AWS = require("aws-sdk");
const crypto = require("crypto");

const ddb = new AWS.DynamoDB.DocumentClient();
const TABLE = process.env.TABLE_NAME;

function makeCode(len = 7) {
  return crypto.randomBytes(4).toString("base64url").slice(0, len);
}

exports.main = async (event) => {
  const method = event.httpMethod || "";
  const resource = event.resource || "";

  // POST /shorten  { "url": "https://..." }
  if (resource.endsWith("/shorten") && method === "POST") {
    let url = "";
    try { url = JSON.parse(event.body || "{}").url || ""; } catch {}
    try { new URL(url); } catch {
      return json(400, { error: 'Provide a valid URL in { "url": "https://..." }' });
    }

    // Write with basic collision retry
    let code = makeCode();
    for (let i = 0; i < 3; i++) {
      try {
        await ddb.put({
          TableName: TABLE,
          Item: { code, url },
          ConditionExpression: "attribute_not_exists(code)"
        }).promise();
        break;
      } catch {
        code = makeCode();
      }
    }

    const host = event.headers["x-forwarded-host"] || event.requestContext.domainName;
    const proto = (event.headers["x-forwarded-proto"] || "https").toString();
    const shortUrl = `${proto}://${host}/${code}`;

    return json(200, { code, shortUrl, target: url });
  }

  // GET /{code} -> 302 redirect
  if (resource.endsWith("/{code}") && method === "GET") {
    const code = event.pathParameters && event.pathParameters.code;
    if (!code) return json(400, { error: "Missing code" });

    const res = await ddb.get({ TableName: TABLE, Key: { code } }).promise();
    const url = res.Item && res.Item.url;
    if (!url) return json(404, { error: "Not found" });

    return { statusCode: 302, headers: { Location: url, "Access-Control-Allow-Origin": "*" }, body: "" };
  }

  return json(404, { error: "Route not found" });
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(body)
  };
}
