package microservices.vehiclemicroservice;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface Repository extends JpaRepository<Vehicle, UUID> {
    List<Vehicle> findByClientId(UUID clientId);
}

