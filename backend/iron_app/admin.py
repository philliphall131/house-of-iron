from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
from django.utils.translation import gettext_lazy as _

class AppUserAdmin(UserAdmin):
    """adds some additional attributes to the default edit user page in django admin"""
    readonly_fields = ('id',)
    fieldsets = (
        (None, {"fields": ("id", "email", "username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email","first_name", "last_name", "password1", "password2"),
            },
        ),
    )
    list_display = ("id", "email", "first_name", "last_name", "is_staff")

class ProgramAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(User, AppUserAdmin)
admin.site.register(Program, ProgramAdmin)