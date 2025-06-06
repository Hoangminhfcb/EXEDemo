# Base SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Nhận biến ENVIRONMENT từ build args, mặc định là Production
ARG ENVIRONMENT=Production

# Sao chép file .csproj
COPY BakeMarket.API/*.csproj ./BakeMarket.API/
COPY BakeMarket.Application/*.csproj ./BakeMarket.Application/
COPY BakeMarket.Domain/*.csproj ./BakeMarket.Domain/
COPY BakeMarket.Infrastructure/*.csproj ./BakeMarket.Infrastructure/
COPY BakeMarket.Shared/*.csproj ./BakeMarket.Shared/

# Restore dependencies
RUN dotnet restore BakeMarket.API/BakeMarket.API.csproj

# Sao chép toàn bộ source
COPY BakeMarket.API ./BakeMarket.API/
COPY BakeMarket.Application ./BakeMarket.Application/
COPY BakeMarket.Domain ./BakeMarket.Domain/
COPY BakeMarket.Infrastructure ./BakeMarket.Infrastructure/
COPY BakeMarket.Shared ./BakeMarket.Shared/

# Nếu là Development, ghi đè appsettings.json
RUN if [ "$ENVIRONMENT" = "Development" ]; then \
    echo "Sử dụng appsettings.Development.json thay cho appsettings.json" && \
    cp BakeMarket.API/appsettings.Development.json BakeMarket.API/appsettings.json ; \
    else \
    echo "Sử dụng mặc định appsettings.json (Production)" ; \
    fi

# Build và publish
RUN dotnet publish BakeMarket.API/BakeMarket.API.csproj -c Release -o /app/out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published output từ stage trước
COPY --from=build /app/out .

# Gán môi trường runtime
ARG ENVIRONMENT=Production
ENV ASPNETCORE_ENVIRONMENT=$ENVIRONMENT

# Entry
ENTRYPOINT ["dotnet", "BakeMarket.API.dll"]
