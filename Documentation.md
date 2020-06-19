**Area Related APIs**

* Assign area to a service provider
    
    * Request (POST => /addArea) 

        ``{
            "area_id": 1,
            "service_id": 1
        }``

    * Response

        ``{
            "message": "Success"
        }``


** Employee Related APIS ** 

    * Add Employee

        * Request (POST => /addEmployee) 

            ``{
                "service_id": 1,
                "employee_name": "sldk",
                "phone_number": "015214458454"
            }``

        * Response

            ``{
                "message": "Success"
            }``

    * Get all Employee of a Service Provider

        * Request (POST => /getEmployee) 

            ``{
                "service_id": 1
            }``

        * Response

            ``{
                "employee": [
                    {
                        "employee_id": 1,
                        "service_id": 1,
                        "employee_name": "XYZ",
                        "phone_number": "01521455214"
                    }
                ],
                "message": "Success"
            }``