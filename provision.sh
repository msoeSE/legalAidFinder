# python docker.py $1 
terraform init
terraform plan
terraform apply
IP=$(jq -r '.modules[].resources."aws_instance.example".primary.attributes.public_ip' terraform.tfstate)
sleep 60
ssh -i ~/.ssh/MyEC2KeyPair.pem ec2-user@${IP} -o StrictHostKeyChecking=no -t './docker.sh'
sleep 30
open http://${IP}
