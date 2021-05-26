# Deployment

## Create AWS EC2 instance
1. #### Launching an instance
    1. Make sure you are in the right region (EU-north Sweden)
    1. Press "Launch instance" on the main page in EC2
1. #### Select Amazon Machine Image
    1. Select "Ubuntu Server 18.04 LTS (HVM)" (free tier) as your Amazon Machine Image (AMI)
    1. The important part here is that it is Linux and free tier
    1. Press select to proceed
1. #### Select Instance type
    1. Select "t3.micro" as our instance type as this is free tier eligible
    1. Press "Next: Configure instance details" to proceed
1. #### Instance configuration
    1. For this example default settings will be enough.
    1. Press "Next: Add Storage" to proceed
1. #### Add a storage
    1. For this example root volume will be enough.
    1. Press "Next: Add Tags" to proceed
1. #### Setting Tags
    1. Tags will not be used in this example
    1. Press "Next: Configure security groups" to proceed
1. #### Configure security groups
    1. Allow your IP to access via SSH
    1. Allow everyone to access via HTTP
    1. Here we could add access via HTTPS, but since we won't bother with certificates it will not be needed
    1. Press "Review and Launch" to proceed
1. #### Save key pair
    1. Set a key pair name and download the key pair (.pem file), take note of where you save the .pem file, (./ssh is a good place)
    1. Press "Launch Instance" to proceed

## Access instance 
Now you will need to SSH into your created instance.
You can find the public ip for your instance on the EC2 instance dashboard.
You'll need to change the permissions of the .pem file so only the root user can read it:
```bash
chmod 400 <path_to_key_pair_file>
```
Then write the folowing to ssh to the instance
```bash
ssh -i <path_to_key_pair_file> ubuntu@<public_ip_from_dashboard>
```
You should now be in your newly created instance.
Now we need to get the web server and give the ubuntu user (the one you logged in with) access to modify the `/var/www/html` directory
```bash
sudo su ## To make subsequent commands as root
apt-get update ## Update the package list
apt-get install apache2 ## install apache2 webserver
start server `service start apache2` ## start the webserver
chown -R ubuntu /var/www/html ## CHange OWNer to ubuntu
```
Now open a new terminal window on your computer.  
Navigate to this project, run `yarn build` to output the project to the `build` directory.
Now we need to transfer the contents of that directory to the instance.  
This could be done in several ways, one is with an SFTP client and the other is with SCP (Secure CoPy)
```bash
scp -r -i <path_to_key_pair_file>.pem <path_to_project_root>/build/* ubuntu@<instance_public_ip>:/var/www/html
```
[Explanation](https://explainshell.com/explain?cmd=scp+-r+-i+den-fantastiska-hemsidan.pem+%2FUsers%2Frobingranstromkall%2FDevelopment%2Fdev-ops-presentation%2Fproject%2Fdeploy-demo%2Fbuild%2F*+ubuntu%40ec2-13-53-169-75.eu-north-1.compute.amazonaws.com%3A%2Fvar%2Fwww%2Fhtml)

ssh in to instance again and run `service apache2 restart`

Great success! Now view your page
