**Area Related APIs**

* Assign area to a service provider
    
    * Request (POST => /addArea) 

            {
                "area_id": 1,
                "service_id": 1
            }

    * Response

            {
                "message": "Success"
            }

* Get all available area 
    
    * Request (GET => /getServiceArea) 


    * Response

            {
                "areas": 
           [
                {
                    "area_id": 1,
                    "area_name": "Mirpur-10",
                    "thana": "Mirpur",
                    "upazilla": "Dhaka City",
                    "district": "Dhaka",
                    "lat": null,
                    "long": null
                },
                {
                    "area_id": 4,
                    "area_name": "Mirpur-1",
                    "thana": "Mirpur",
                    "upazilla": "Dhaka City",
                    "district": "Dhaka",
                    "lat": null,
                    "long": null
                }
            ],
            "message": "Success"
           }
* Get all available Services in selected area
    
    * Request (GET => /getServiceName/areaId) 


    * Response

            {
                "services": [
                    [
                        {
                            "service_id": 1,
                            "service_name": "Hello Deliver",

                        }
                    ]
                ],
                "message": "Success"
            }   

**Employee Related APIS** 

* Add Employee

    * Request (POST => /addEmployee) 

            {
                "service_id": 1,
                "employee_name": "sldk",
                "phone_number": "015214458454"
            }

    * Response

            {
                "message": "Success"
            }

* Get all Employee of a Service Provider

    * Request (POST => /getEmployee) 

            {
                "service_id": 1
            }

    * Response

            {
                "employee": [
                    {
                        "employee_id": 1,
                        "service_id": 1,
                        "employee_name": "XYZ",
                        "phone_number": "01521455214"
                    }
                ],
                "message": "Success"
            }

* Update Employee

    * Request (POST => /updateEmployee) 

            {
                "employee_id": 3,
                "employee_name": "this_is_for_test",
                "phone_number": "00000000000"
            }

    * Response

            {
                "message": "Success"
            }

* Delete Employee

    * Request (POST => /deleteEmployee) 

            {
                "employee_id": 5
            }

    * Response

            {
                "message": "Success"
            }

**Profile Related APIs**

* Get service provider All Profile Data

    * Request (POST => /getProfile) 

            {
                "userid": 1
            }

    * Response

            {
                "userid": 1,
                "username": "ABC Service",
                "company_name": "ABC",
                "description": "description",
                "service_type": "Grocery",
                "delivery_charge": 50,
                "userphone": "01245152",
                "phone_2": null,
                "nid": null,
                "trade_license": null,
                "address": null,
                "nid_photo": null,
                "profile_picture": null
            }

* Update service provider Profile Data

    * Request (PATCH => /updateProfile) 

            {
                "userid": 1,
                "username": "Food Pandaas",
                "company_name": "Food Team",
                "description": "description",
                "service_type": "Grocery",
                "delivery_charge": 50,
                "userphone": "01521461529",
                "phone_2": "01782335868",
                "nid": "2378SNS57446SC4",
                "trade_license": "TLAF1C2SZSKLDHFN54",
                "address": "THI SDJFOIJ SDJFOS,F DFJIOSDF",
                "password": "324545SKJDJF",
                "nid_photo": "LSDFKLKDFJ",
                "profile_picture": "AKSDF"
            }

    * Response

            {
                "message": "Success"
            }

**Products Related APIs**

* Get Universal Product Data

    * Request (GET => /allProducts) 

    * Response

            {
                "products": [
                    {
                        "product_id": 1,
                        "product_name": "Chaal",
                        "qty": 1,
                        "unit": "kg",
                        "company_name": "Bashmati",
                        "vat": 10
                    },
                    {
                        "product_id": 2,
                        "product_name": "Daal",
                        "qty": 1,
                        "unit": "kg",
                        "company_name": "slkdjfi",
                        "vat": 15
                    },
                    {
                        "product_id": 3,
                        "product_name": "Pepsi",
                        "qty": 250,
                        "unit": "ml",
                        "company_name": "Pepsi",
                        "vat": 1
                    }
                ],
                "message": "Success"
            }

* Get Service-Providers All Product List

    * Request (POST => /ownProducts) 

            {
                "service_id": 1
            }
    
    * Response

            {
                "products": [
                    {
                        "inventory_id": 15,
                        "service_id": 1,
                        "product_id": 1,
                        "delivery_limit": "2kg",
                        "price": 50
                    },
                    {
                        "inventory_id": 16,
                        "service_id": 1,
                        "product_id": 2,
                        "delivery_limit": "",
                        "price": 20
                    }
                ],
                "message": "Success"
            }

* Get Particular Product Details

    * Request (POST => /getProductDetails) 

            {
                "product_id": 1
            }
    
    * Response

            {
                "products": [
                    {
                       "product_id": 1,
                        "product_name": "Chaal",
                        "qty": 1,
                        "unit": "kg",
                        "company_name": "Bashmati",
                        "vat": 10
                    }
                ],
                "message": "Success"
            }



**Order Related APIs**

* Create Order

    <!-- * Request (POST => /createOrder) 

                {
                    "customer_id": 1,
                    "service_id": 3,
                    "order_time": "22-01-2020 11:15",
                    "customer_address_id": 2,
                    "payment": 25
                }
    
    * Response

            {
                "message": "Success"
            }

    * Request (POST => /createOrderDetails) 

            {
	            "details":
	            [
		
                    {"order_id":1, "product_id":1,"qty":"5 kg","price": 500},
                    {"order_id":1, "product_id":2,"qty":"5 kg","price": 600},
                    {"order_id":1, "product_id":3,"qty":"5 kg","price": 700},
                    {"order_id":1, "product_id":4,"qty":"5 kg","price": 800}
		
	            ]
            }
    
    * Response

            {
                "message": "Success"
            } -->
    * Request (POST => /getOrderDetails) 

            {
	            "orderId": 1
            }
    
    * Response

            {
                "details": 
                [
                    {
                        "order_details_id": 1,
                        "order_id": 1,
                        "product_id": 1,
                        "qty": "5 kg",
                        "price": 500
                    },
                    {
                        "order_details_id": 2,
                        "order_id": 1,
                        "product_id": 2,
                        "qty": "5 kg",
                        "price": 600
                    },
                    
                ],
                "message": "Success"
            }
* Assign Employee

    * Request (POST => /assignEmployee) 

            {
                "order_id" : 2,
                "employee_id" : "1"
            }
    
    * Response

            {
                "message": "Success.Employee Selected"
            }
* Customer Address
* Request (POST => /createCustomerAddress) 

            {
	                "userid":1, 
                    "road_no":"54/A",
                    "house_no":"23-D",
                    "area_id": 4,
                    "further_description": "null"
            }
    
    * Response

            {
                 "customer_add_id": 24
            }

** If there is duplicate data it will not create the address again and will show the customer_add_id.
**area id needed to know for an account





    * Request (POST => /getCustomerAddress) 

            {
	            "customerId": 1
            }
    
    * Response

            {
                "address": 
                [
                    {
                        "customer_add_id": 1,
                        "customer_id": 1,
                        "road_no": "station_road-12",
                        "house_no": "132",
                        "area_id": 4,
                        "further_description": null
                    },
                    {
                        "customer_add_id": 6,
                        "customer_id": 1,
                        "road_no": "54/A",
                        "house_no": "23-D",
                        "area_id": 1,
                        "further_description": null
                    }
                ],
                "message": "Success"
            }


**Customer Register


    *Request (POST => /register)

            {
                 "username" : toha,
                 "phone" : 01534771222
            }
    
    *Response

            {
                "message": "Success.User is registered."
            }

**Customer Login

    *Request (POST => /login)

            {
                "phone" : 01534771222
            }
    
    *Response 

            {
                "message": "Success.OTP is sent to the number."
            }

**Customer Verify

    *Request (POST => /verify)

                {
                    "code" : "6 digit otp to the number"
                }

    *Response 

            {
                "message": "Success.User is logged in."

                "token" :
                [
                    {
			            "customer_phone" : 01534771222
                    }
                ]
            }
**Customer Logout

    *Request (GET => /logout)

    *Response 

        {
            "message": "success"
        }

** Service Register

    *Request (POST => /serviceregister)

            {

                "service_name" : "toto service",
                "description" : "demo",
                "service_type" : "Food",
                "delivery_charge" : "60",
                "company_name" : "toto",
                "phone_1" : "01534771222",
                "nid" : "12345678" ,
                "trade_license" : "12345678",
                "address" : "Sylhet"

            }

    *Response 

            {
                "message": "Success.Service Provider is registered."
            }


**Service Login

    *Request (POST => /servicelogin)

            {
                "phone" : "01534771222"

            }

    *Response

            {

                 "message": "Success.OTP is sent to the number."
                
             }

**Service Verify

 *Request (POST => /serviceverify)

                {
                    "code" : "6 digit otp to the number"
                }

    *Response 

            {
                "message": "Success.User is logged in."

                "token" :
                [
                    {
			            "service_phone" : 01534771222
                    }
                ]
            }
 

 **Service Provider Logout

    *Request (GET => /servicelogout)

    *Response 

        {
            "message": "success"
        }



** Customer Get Profile

        *Request (POST => /customerprofile)

           {

                 "userid": 1

            }
    *Response

            {

                 "userid": 1,
                 "username": "Mew",
                 "userphone": "01521776654"
                
             }


** Customer Update Profile

        *Request (PATCH => /customerupdateprofile)

           {

                 "userid": 1,
                 "username": "Mew",
                 "userphone": "01521776654"

            }
    *Response

            {

                 "message": "Success"
                
             }






For 350 some decision was taken:

*customer must login for order
*updating number not handled in good way..if one want to update the phone number we have to send the otp to the previous number to change the number..but for now it was not handled.
*If the cart is empty,checkout should not work. 

** Customer Create Orders

        *Request (POST => /createcustomerorder)

           {
                    "userid": 2,
                    "service_id": 2,
                    "order_time": "2020-05-03 5:20",
                    "customer_address_id": 1,
                    "payment": 2500,
                     "details":
                     [
		
                        {"product_id":1,"qty":"5 kg","price": 500},
                        {"product_id":2,"qty":"5 kg","price": 600},
                        {"product_id":3,"qty":"5 kg","price": 700},
                        {"product_id":4,"qty":"5 kg","price": 800}
                     ]
		
	            
            }
    *Response

           {

                  "message": "Success"

            }


**service provider orders:

    *Request (POST => /getserviceorders)
    {
         "userid": 1
    }


    *Response
        {
            "details": [
                {
                    "order_id": 6,
                    "customer_name": "toha",
                    "customer_phone": "01534771111",
                    "address": "132,station_road-12,Tilagorh,Sylhet",
                    "further_description": null,
                    "payment": 25,
                    "delivered": 0
                },
                {
                    "order_id": 17,
                    "customer_name": "toha",
                    "customer_phone": "01534771222",
                    "address": "23-D,54/A,Zindabazar,Sylhet",
                    "further_description": "null",
                    "payment": 253,
                    "delivered": 0
                },
                {
                    "order_id": 18,
                    "customer_name": "toha",
                    "customer_phone": "01534771222",
                    "address": "23-D,54/A,Zindabazar,Sylhet",
                    "further_description": "null",
                    "payment": 253,
                    "delivered": 0
                }
            ],
            "message": "Success."
}

**service provider employee assigned orders:


*Request (POST => /getassignedserviceorders)
    {
         "userid": 1
    }


    *Response
        {
            
            "details": [
                {
                    "order_id": 2,
                    "customer_name": "samay",
                    "customer_phone": "01534771222",
                    "address": "23-D,54/A,Zindabazar,Sylhet",
                    "further_description": "call to 01574312323",
                    "payment": 506,
                    "employee": "sldkfj",
                    "time": "2021-02-10T20:54:00.000Z"
                }
            ],
            "message": "Success."
        }

**service provider Order Details


    *Request(POST => /getserviceordersdetails)
            {
                   
		            "order_id": 19
                    
            }

    *Response
                {
        "details": [
            {
                "product_name": "Coca-cola",
                "quantity": "3",
                "product price per unit": 20,
                "product size": "500 ml"
            },
            {
                "product_name": "Pepsi",
                "quantity": "3",
                "product price per unit": 20,
                "product size": "250 ml"
            },
            {
                "product_name": "Chaal",
                "quantity": "5",
                "product price per unit": 55,
                "product size": "1 Kg"
            }
        ],
    "message": "Success."
}


**service Provider Complete Order


    *Request (POST => /completeserviceorder)
    {
        "order_id": 6
    }

    *Response 
    {
        "message": "Success"
    }


**service Provider Add Product

     *Request (POST => /addproduct)
    {
        "service_id": 1,
        "product_id": 1,
        "price": 90
    }

    *Response 
    {
        "message": "Successfully Enlisted."
    }

**service Provider Update Product

     *Request (POST => /updateproduct)
    {
        "service_id": 1,
        "product_id": 1,
        "price": 90
    }

    *Response 
    {
        "message": "Successfully Updated"
    }

**service Provider delete Product

     *Request (POST => /deleteproduct)
    {
        "service_id": 1,
        "product_id": 1,
    }

    *Response 
    {
        "message": "Successfully deleted"
    }


**Service Provider Statistics

 *Request (POST => /getservicestats)
    {
        "start_date": "2021-02-10",
        "end_date": "2021-02-11",
        "service_id": 1
    }

    *Response 
    
        {
            "total_orders": 2,
            "delivered": 2,
            "income": 527,
            "employee": [
                {
                    "name": "Ahmed Ullah Jumman",
                    "income": 506,
                    "delivered": 1
                },
                {
                    "name": "Jamal Ahmed",
                    "income": 21,
                    "delivered": 1
                }
            ],
            "message": "Success"
        }
    

** Service Order History

    *Request (POST => /getserviceorderhistory)
    {
        "userid": 1
    }

    *Response 
    {
    "details": [
            {
                "order_id": 2,
                "customer_name": "samay",
                "customer_phone": "01534771222",
                "address": "23-D,54/A,Zindabazar,Sylhet",
                "further_description": "call to 01574312323",
                "payment": 506,
                "time": "2021-02-10T20:54:00.000Z"
            },
            {
                "order_id": 3,
                "customer_name": "samay",
                "customer_phone": "01534771222",
                "address": "23-D,54/A,Zindabazar,Sylhet",
                "further_description": "",
                "payment": 395,
                "time": "2021-02-10T20:55:00.000Z"
            },
            {
                "order_id": 4,
                "customer_name": "samay",
                "customer_phone": "01534771222",
                "address": "23-D,54/A,Zindabazar,Sylhet",
                "further_description": "call to 01765431234",
                "payment": 92,
                "time": "2021-02-11T08:57:00.000Z"
            },
            {
                "order_id": 5,
                "customer_name": "samay",
                "customer_phone": "01534771222",
                "address": "23-D,54/A,Zindabazar,Sylhet",
                "further_description": "call to 01574312323",
                "payment": 211,
                "time": "2021-02-11T09:05:00.000Z"
            },
            {
                "order_id": 6,
                "customer_name": "samay",
                "phone": "01534771222",
                "address": "13,54/A,Zindabazar,Sylhet",
                "further_description": "call to 012345678",
                "payment": 654,
                "time": "2021-02-11T10:50:00.000Z"
            }
        ],
        "message": "Success."
    }


**Customer Order History


     *Request (POST => /getcustomerorderhistory)
    {
        "userid": 13
    }
    *Response
            {
        "details": [
            {
                "order_id": 2,
                "customer_phone": "01534771222",
                "address": "23-D,54/A,Zindabazar,Sylhet",
                "further_description": "call to 01574312323",
                "payment": 506,
                "time": "2021-02-10T20:54:00.000Z"
            },
            {
                "order_id": 3,
                "customer_phone": "01534771222",
                "address": "23-D,54/A,Zindabazar,Sylhet",
                "further_description": "",
                "payment": 395,
                "time": "2021-02-10T20:55:00.000Z"
            },
            {
                "order_id": 4,
                "customer_phone": "01534771222",
                "address": "23-D,54/A,Zindabazar,Sylhet",
                "further_description": "call to 01765431234",
                "payment": 92,
                "time": "2021-02-11T08:57:00.000Z"
            },
            {
                "order_id": 5,
                "customer_phone": "01534771222",
                "address": "23-D,54/A,Zindabazar,Sylhet",
                "further_description": "call to 01574312323",
                "payment": 211,
                "time": "2021-02-11T09:05:00.000Z"
            },
            {
                "order_id": 6,
                "customer_phone": "01534771222",
                "address": "13,54/A,Zindabazar,Sylhet",
                "further_description": "call to 012345678",
                "payment": 654,
                "time": "2021-02-11T10:50:00.000Z"
            }
        ],
        "message": "Success."
    }


**Service Provider Remove Area

*Request(POST => /removearea)
    {
        "service_id": 1,
        "area_id" :1
    }

*Response 
    {
           "message": "Successfully deleted the area"
    }


**Service Provider product details:
   
    *Request(POST => /getOwnProductDetails)
        {
                "service_id": 1,
                "product_id" :1
        }
    *Response
    {
            "product_name": "Chaal",
            "qty": 1,
            "unit": "Kg",
            "company_name": "Bashmati",
            "vat": 10,
            "price": 50,
            "message": "Success"

    }

**Pie Chart

    *Request(POST => /piechart)
    {
        "service_id" : 1
    }

    *Response
    {
        "products": [
            {
                "name": "Chaal",
                "ordered": 4
            },
            {
                "name": "Pepsi",
                "ordered": 2
            },
            {
                "name": "Daal",
                "ordered": 4
            },
            {
                "name": "Mojo",
                "ordered": 1
            }
        ],
        "message": "Successful"
    }

**Line Chart

    *Request(POST => /linechart)
    {
       "start_date": "2021-02-10",
        "end_date": "2021-02-28",
        "service_id": 1
    }

    *Response
    {
        "details": [
        {
            "date": "23-1-2021",
            "orders": 1
        }
    ],
    "message": "Success"
    }

**Horizontal Bar Chart

   *Request(POST => /horizontalbarchart)
    {
       "start_date": "2021-02-10",
        "end_date": "2021-02-28",
        "service_id": 1
    }

    *Response
    {
            "details": [
            {
                "name": "Jamal Ahmed",
                "income": 21
            }
        ],
        "message": "Success"
    }