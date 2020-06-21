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
           "areas": [
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

* Get All Profile Data

    * Request (POST => /getProfile) 

            {
                "service_id": 1
            }

    * Response

            {
                "service_id": 1,
                "service_name": "ABC Service",
                "company_name": "ABC",
                "phone_1": "01245152",
                "phone_2": null,
                "nid": null,
                "trade_license": null,
                "address": null,
                "password": null,
                "nid_photo": null,
                "profile_picture": null
            }

* Update Profile Data

    * Request (POST => /updateProfile) 

            {
                "service_id": 1,
                "service_name": "Food Pandaas",
                "company_name": "Food Team",
                "phone_1": "01521461529",
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
                        "measure": "1kg",
                        "company_name": "Bashmati",
                        "vat": 10
                    },
                    {
                        "product_id": 2,
                        "product_name": "Daal",
                        "measure": "1kg",
                        "company_name": "slkdjfi",
                        "vat": 15
                    },
                    {
                        "product_id": 3,
                        "product_name": "Pepsi",
                        "measure": "250 ml",
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
                        "service_id": 1,
                        "product_id": 1,
                        "delivery_limit": "2kg",
                        "price": 50
                    },
                    {
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
                        "measure": "1kg",
                        "company_name": "Bashmati",
                        "vat": 10
                    }
                ],
                "message": "Success"
            }