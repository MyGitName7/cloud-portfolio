// lib/network-lab-stack.ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class NetworkLabStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // -----------------------------
    // VPC: 10.0.0.0/16
    // - Public subnets  (for web server)
    // - Private subnets (isolated, for internal server later)
    // -----------------------------
    const vpc = new ec2.Vpc(this, "NetworkLabVpc", {
      vpcName: "network-lab-vpc",
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
      maxAzs: 2,
      natGateways: 0, // keep costs low; private subnets have no internet

      subnetConfiguration: [
        {
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: "private-isolated",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    });

    // Output the VPC ID so you can see it in the console
    new cdk.CfnOutput(this, "VpcId", {
      value: vpc.vpcId,
      exportName: "NetworkLabVpcId",
    });

    // -----------------------------
    // Security Group for web server
    // - Allows HTTP from anywhere (for demo)
    // - We'll tighten SSH later
    // -----------------------------
    const webSg = new ec2.SecurityGroup(this, "WebServerSG", {
      vpc,
      securityGroupName: "network-lab-web-sg",
      description: "Allow HTTP from the internet for the demo web server",
      allowAllOutbound: true,
    });

    // Allow HTTP (port 80) from anywhere so you can test in a browser
    webSg.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allow HTTP from anywhere"
    );

    // -----------------------------
    // EC2 web server (public subnet)
    // -----------------------------
    const webServer = new ec2.Instance(this, "WebServerInstance", {
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup: webSg,
      // keyName: "your-keypair-name", // we'll add this later for SSH access
    });

    // Simple user data to install and start nginx
    webServer.addUserData(
      "#!/bin/bash",
      "yum update -y",
      "yum install -y nginx",
      "systemctl enable nginx",
      "systemctl start nginx",
      "echo '<h1>Network Lab Web Server</h1><p>If you see this, your VPC + EC2 are working.</p>' > /usr/share/nginx/html/index.html"
    );

    // Output the public IP so you can test in a browser
    new cdk.CfnOutput(this, "WebServerPublicIp", {
      value: webServer.instancePublicIp,
      exportName: "NetworkLabWebServerPublicIp",
    });
  }
}
