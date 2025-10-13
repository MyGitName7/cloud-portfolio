"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlShortenerStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
class UrlShortenerStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // DynamoDB: shortCode -> longUrl (+ optional ttl)
        const table = new aws_dynamodb_1.Table(this, 'LinksTable', {
            partitionKey: { name: 'code', type: aws_dynamodb_1.AttributeType.STRING },
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY, // dev/demo; switch to RETAIN later
            tableName: 'url-shortener-links'
        });
        // Lambda: handles POST /shorten + GET /{code}
        const fn = new aws_lambda_1.Function(this, 'ShortenerFn', {
            runtime: aws_lambda_1.Runtime.NODEJS_20_X,
            handler: 'handler.main',
            code: aws_lambda_1.Code.fromAsset('lambda'),
            memorySize: 256,
            timeout: aws_cdk_lib_1.Duration.seconds(10),
            environment: {
                TABLE_NAME: table.tableName,
                BASE_HOST: '' // (optional) set if you later use a custom domain
            }
        });
        table.grantReadWriteData(fn);
        // API Gateway (REST): /shorten (POST), /{code} (GET)
        const api = new aws_apigateway_1.LambdaRestApi(this, 'ShortenerApi', {
            handler: fn,
            proxy: false,
            endpointConfiguration: { types: [aws_apigateway_1.EndpointType.REGIONAL] },
            defaultCorsPreflightOptions: {
                allowOrigins: ['*'],
                allowMethods: ['GET', 'POST', 'OPTIONS'],
                allowHeaders: ['Content-Type']
            }
        });
        const shorten = api.root.addResource('shorten');
        shorten.addMethod('POST'); // invokes same lambda
        const code = api.root.addResource('{code}');
        code.addMethod('GET'); // invokes same lambda
        new aws_cdk_lib_1.CfnOutput(this, 'ApiBaseUrl', { value: api.url, exportName: 'UrlShortenerApiBaseUrl' });
    }
}
exports.UrlShortenerStack = UrlShortenerStack;
