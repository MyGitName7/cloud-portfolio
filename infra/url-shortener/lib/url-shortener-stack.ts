import {
  Stack, StackProps, Duration, CfnOutput, RemovalPolicy
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime, Code, Function as LambdaFn } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi, EndpointType } from 'aws-cdk-lib/aws-apigateway';
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb';

export class UrlShortenerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // DynamoDB: shortCode -> longUrl (+ optional ttl)
    const table = new Table(this, 'LinksTable', {
      partitionKey: { name: 'code', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY, // dev/demo; switch to RETAIN later
      tableName: 'url-shortener-links'
    });

    // Lambda: handles POST /shorten + GET /{code}
    const fn = new LambdaFn(this, 'ShortenerFn', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler.main',
      code: Code.fromAsset('lambda'),
      memorySize: 256,
      timeout: Duration.seconds(10),
      environment: {
        TABLE_NAME: table.tableName,
        BASE_HOST: '' // (optional) set if you later use a custom domain
      }
    });
    table.grantReadWriteData(fn);

    // API Gateway (REST): /shorten (POST), /{code} (GET)
    const api = new LambdaRestApi(this, 'ShortenerApi', {
      handler: fn,
      proxy: false,
      endpointConfiguration: { types: [EndpointType.REGIONAL] },
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowMethods: ['GET','POST','OPTIONS'],
        allowHeaders: ['Content-Type']
      }
    });

    const shorten = api.root.addResource('shorten');
    shorten.addMethod('POST'); // invokes same lambda

    const code = api.root.addResource('{code}');
    code.addMethod('GET'); // invokes same lambda

    new CfnOutput(this, 'ApiBaseUrl', { value: api.url, exportName: 'UrlShortenerApiBaseUrl' });
  }
}
