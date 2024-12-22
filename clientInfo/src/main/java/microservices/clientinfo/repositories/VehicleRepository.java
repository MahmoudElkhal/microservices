package microservices.clientinfo.repositories;

import microservices.clientinfo.entities.Maintenance;
import microservices.clientinfo.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VehicleRepository extends JpaRepository<Vehicle, UUID> {
    List<Vehicle> findByClientId(UUID clientId);
}
