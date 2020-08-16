from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import CatalogSerializer
from .models import Catalog

class CatalogView(ListCreateAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer
    pagination_class = None

class SingleCatalogView(RetrieveUpdateDestroyAPIView):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer
