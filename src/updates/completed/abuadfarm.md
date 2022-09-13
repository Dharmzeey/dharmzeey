---
title: Abuad Farm
slug: abuad-farm
intro: This is a web application that is based off of a operation in manufacturing company with different units.
url: https://abuadfarm.herokuapp.com
image: /images/abuadfarm/Admin-home.png
---


Website: [Visit Web Page](https://abuadfarm.herokuapp.com)
- **I removed all pictures and painted the names because of some reasons**

I designed this web Application on the foundation of a Manufacturing Company.
It is a Django Project, which I also used djangorestframework for some serialization.
I used vanilla Js and Tailwind CSS(django-tailwind)
Django-Allauth was used for the authentication 

It has different Apps that handled different functionalities

You can check the mini documentation [Here](https://github.com/Dharmzeey/ABUADFarm/blob/master/code_docs.txt)
![image](/images/abuadfarm/Home-page.png)


# ADMIN
**The Admin is a Django superuser who has full access to the Django Admin Panel and also to all the units and products and all customers both in the Django Admin Panel and the other Admin Page** 
## The Admin can:
- Can view all the Units.
- Can view all the customers on the Database, regardless of the unit they have made purchase from 
- Can see all messages sent to all customers 
![image](/images/abuadfarm/Admin-customers.png)

- Ultimately, can have access to all the features, models and everything of the Django Admin panel and also perform CRUD operations on everything in the Django Admin Panel 

![image](/images/abuadfarm/Admin-home.png)

# STAFFS
**The Staffs is also Django Staff, they only have restricted access to the models and customers concerning their units alone and has restricted access to the Django Admin panel.**
- These are the users that have been assigned to each units in the company 
### Their Staffs status was created by the superuser (Admin) in the Admin panel 
## Staffs Can:
- View all the customers that made purchase from their units 
- Send message to each customers who has made purchase from their units 
- Add customers product purchase for each customer who made purchase from their units 

# USERS
**Customers only have access to their accounts alone(which contains all the units they made purchases)**
**All accounts created have user and  profiles model**
**But they are later given different statuses**
- Users are customers who created account and made purchase from any unit 
## Users can:
- Have access to their Dashboard, Messages, Notifications and Profiles 


***
## Frameworks
- Django
* Django-allauth 
+ DjangorestFramwork
- Django-Tailwind 
***
## Lbraries
- Amcharts js 
- Tailwind
- Font awesome
- Google fonts

**If you want to gain access to the User (Customer) Panel**
**Click Account and login with this details**

 ( Username: Testing, 
  Password: Heroku1 )