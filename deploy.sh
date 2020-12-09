#!/bin/bash
ssh -i ~/.ssh/fit-staging-2.pem ubuntu@ec2-3-94-178-185.compute-1.amazonaws.com 'cd deploy-app && dep deploy --branch=status_template'
