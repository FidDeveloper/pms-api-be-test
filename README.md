# Pet Management System Backend (Spring Boot)

Backend service for managing pets, customers, authentication, and related pet metadata using Spring Boot.

## Tech Stack

- Java 21
- Spring Boot 3.4.11
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Security Crypto
- JWT (jjwt 0.11.5)
- Spring Mail
- MySQL (mysql-connector-java 8.0.24)
- Lombok
- Log4j2
- Maven Wrapper (`mvnw` / `mvnw.cmd`)
- Packaging: WAR (embedded Tomcat starter provided)

## Project Structure

```text
PetManagementSystem_Backend_SpringBoot/
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── innov/
        │           ├── booking/
        │           │   ├── BookingApplication.java
        │           │   ├── GeneralException.java
        │           │   ├── GlobalExceptionHandler.java
        │           │   └── ServletInitializer.java
        │           ├── config/
        │           │   └── SecurityConfig.java
        │           ├── constant/
        │           │   ├── AppConstant.java
        │           │   ├── ConfigConstant.java
        │           │   ├── ErrorCode.java
        │           │   └── HttpStatusCode.java
        │           ├── controller/
        │           │   ├── AuthenticationController.java
        │           │   ├── CustomerLoginController.java
        │           │   ├── PetController.java
        │           │   └── TestController.java
        │           ├── dto/
        │           │   ├── AuthenticationDto.java
        │           │   ├── CustomerDto.java
        │           │   ├── GeneralResponse.java
        │           │   ├── LoginDto.java
        │           │   ├── PageDto.java
        │           │   ├── PetConstantsDto.java
        │           │   ├── PetDetailDto.java
        │           │   └── TestDto.java
        │           ├── model/
        │           │   ├── Customer.java
        │           │   ├── PetConstant.java
        │           │   ├── PetDetail.java
        │           │   └── PetMedical.java
        │           ├── repository/
        │           │   ├── ICustomerRepo.java
        │           │   ├── IPetConstantRepo.java
        │           │   ├── IPetDetailRepo.java
        │           │   ├── IPetMedicalRepo.java
        │           │   └── IUserRespository.java
        │           ├── service/
        │           │   ├── AuthenticationService.java
        │           │   ├── CustomerService.java
        │           │   ├── EmailService.java
        │           │   ├── GeneralService.java
        │           │   ├── PasswordService.java
        │           │   ├── PetDetailService.java
        │           │   └── UserService.java
        │           └── utility/
        │               ├── JwtAuthFilter.java
        │               └── JwtService.java
        └── resources/
            ├── application.properties
            └── logback-spring.xml
```

## Getting Started

### Prerequisites

- Java 21
- Maven (optional if using wrapper)
- MySQL running locally or remotely

### Run the App

On macOS/Linux:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

### Build the Project

```bash
./mvnw clean package
```

## Configuration

Update runtime configuration in:

- `src/main/resources/application.properties`

Typical settings include:

- Database URL, username, password
- Mail server configuration
- JWT secret and token settings
- Logging configuration

### Environment / Property Reference

The project uses `application.properties` directly. For production or shared environments, move secrets to environment variables or a secret manager and inject them at runtime.

| Property | Purpose | Example Value |
| --- | --- | --- |
| `server.address` | Bind address for the Spring Boot app | `0.0.0.0` |
| `spring.datasource.url` | MySQL JDBC URL | `jdbc:mysql://localhost:3306/pethub` |
| `spring.datasource.username` | Database username | `root` |
| `spring.datasource.password` | Database password | `<DB_PASSWORD>` |
| `spring.datasource.driver-class-name` | JDBC driver class | `com.mysql.cj.jdbc.Driver` |
| `spring.datasource.hikari.minimum-idle` | Min idle DB connections | `5` |
| `spring.datasource.hikari.maximum-pool-size` | Max DB pool size | `10` |
| `spring.datasource.hikari.idle-timeout` | Idle timeout (ms) | `30000` |
| `spring.datasource.hikari.connection-timeout` | Connection timeout (ms) | `30000` |
| `spring.datasource.hikari.max-lifetime` | Connection max lifetime (ms) | `1800000` |
| `spring.datasource.hikari.pool-name` | Hikari pool name | `HikariPool-1` |
| `spring.mail.host` | SMTP host | `smtp.gmail.com` |
| `spring.mail.port` | SMTP port | `587` |
| `spring.mail.username` | Mail username/sender | `<MAIL_USERNAME>` |
| `spring.mail.password` | Mail app password | `<MAIL_APP_PASSWORD>` |
| `spring.mail.properties.mail.smtp.auth` | SMTP auth enable | `true` |
| `spring.mail.properties.mail.smtp.starttls.enable` | STARTTLS enable | `true` |
| `jwt.secret.access` | JWT signing secret | `<JWT_SECRET>` |
| `logging.file.name` | Log file path | `./logs/booking.log` |
| `logging.level.root` | Root log level | `INFO` |
| `logging.level.com.innov.controller` | Controller package log level | `DEBUG` |
| `logging.pattern.file` | File log format | `%d{yyyy-MM-dd HH:mm:ss} ...` |

## API Endpoints

Base API groups from controllers:

- Authentication controller base: `/user/auth`
- Customer/login controller base: `/api`
- Pet controller base: `/pet`
- Test controller base: `/test`

### Authentication APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/user/auth/login` | Login and return JWT token |
| `POST` | `/user/auth/checkUserToken` | Validate token and return customer |

### Customer / Login APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/customerRegister` | Register customer profile |
| `POST` | `/api/credentialSetup` | Setup username/credential |
| `POST` | `/api/login` | Customer login |
| `POST` | `/api/checkForgotPass` | Forgot-password eligibility check |
| `POST` | `/api/forgotPassword` | Reset customer password |
| `PATCH` | `/api/updateUser/{userId}` | Update customer info |
| `POST` | `/api/test2` | Internal/test login helper |
| `GET` | `/api/search` | Internal/test email trigger |

### Pet APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/pet/getAllPet` | Get pet constants/listing |
| `POST` | `/pet/addPet/{id}` | Add pet for owner |
| `POST` | `/pet/getAllPetDetails/{id}` | Paginated pet details |
| `POST` | `/pet/addPetMedical/{ownerId}/{petId}` | Add pet medical history |
| `GET` | `/pet/getAllPetMedical/{ownerId}` | Get all medical records by owner |
| `GET` | `/pet/getPetMedical/{ownerId}/{petId}` | Get medical records by owner + pet |
| `POST` | `/pet/updatePet/{ownerId}` | Update pet details |
| `DELETE` | `/pet/deletePet/{petId}` | Delete pet |
| `PATCH` | `/pet/updatePetMedical/{petMedicalId}` | Update pet medical record |
| `DELETE` | `/pet/deletePetMedical/{petMedicalId}` | Delete pet medical record |
| `GET` | `/pet/getTest` | Internal test endpoint |

### Test API

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/test/getTestData` | Echo test DTO payload |

### Sample Request

```bash
curl -X POST http://localhost:8080/user/auth/login \
    -H "Content-Type: application/json" \
    -d '{
        "email": "user@example.com",
        "password": "password123"
    }'
```

## Docker Quickstart (MySQL + App)

This repository now includes:

- `Dockerfile` (multi-stage build: Maven build + JRE runtime)
- `docker-compose.yml` (MySQL + backend service)
- `.dockerignore`

1. Build and run containers:

```bash
docker compose up -d --build
```

2. Follow app logs:

```bash
docker compose logs -f app
```

3. Stop containers:

```bash
docker compose down
```

4. Remove containers and volumes (optional full reset):

```bash
docker compose down -v
```

If your local `application.properties` has hard-coded credentials or paths, prefer replacing them with environment-variable placeholders before sharing the repository.

## Main Modules

- Authentication and security: JWT + Spring Security
- Customer and login flows
- Pet details and pet constants management
- Shared DTO, constants, exception handling, and utility services
