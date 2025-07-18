from django.db import models

class Customer(models.Model):
    customer_no = models.IntegerField(unique=True, null=False)
    name = models.CharField(max_length=100, null=False)
    contact_no = models.CharField(max_length=20, null=False, default='0')
    secondary_contact_no = models.CharField(max_length=20, null=True)
    address_line1 = models.CharField(max_length=100, null=True)
    address_line2 = models.CharField(max_length=100, null=True)
    district = models.CharField(max_length=20, null=True)
    pincode = models.IntegerField( null=True)
    adharcard = models.CharField(max_length=20, null=True)
    created_on = models.DateTimeField(auto_now_add=True, null=True)
    updated_on = models.DateTimeField(auto_now=True, null=True)


    class Meta:
        db_table = 'customers'
        
    def __str__(self):
        return f"{self.name} ({self.customer_id})" 
