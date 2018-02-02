provider "aws" {
  region     = "us-west-2"
}

resource "aws_instance" "example" {  
  ami           = "ami-3b239843"
  instance_type = "t2.micro"

  key_name      = "MyEC2KeyPair"
  security_groups = [
    "launch-wizard-2"
  ]

  tags {
     Name       = "terraform instance"
  }
}
