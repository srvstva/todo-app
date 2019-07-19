from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=160)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'Todo(title="{self.title}", completed={self.completed}'
