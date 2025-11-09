
import uuid
from django.db import models

class Book(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.TextField()
    author = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tag = models.TextField(null=True, blank=True)
    image_url = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "books"        # щоб збігалося з існуючою таблицею Supabase
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} — {self.author}"
