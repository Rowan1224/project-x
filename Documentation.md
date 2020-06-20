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