package microservices.clientinfo.repositories;

import microservices.clientinfo.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {

}
