# to enable ingress
minikube addons enable ingress

# verdaccio url
http://192.168.49.2:30719/


 
 # access mongo db
 kubectl get pods
 kubectl exec orders-mongo-depl-66f76dfdc4-r6kt6 sh -it 

> show dbs
> use orders
orders> db.tickets.find({})


  