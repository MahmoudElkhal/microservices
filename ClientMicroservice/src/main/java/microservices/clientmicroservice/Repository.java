package microservices.clientmicroservice;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface Repository extends JpaRepository<Client, UUID> {
}

