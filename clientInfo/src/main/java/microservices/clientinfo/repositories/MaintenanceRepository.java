package microservices.clientinfo.repositories;

import microservices.clientinfo.entities.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MaintenanceRepository extends JpaRepository<Maintenance, UUID> {
    List<Maintenance> findByVehicleId(UUID vehicleId);

    List<Maintenance> findByClientId(UUID clientId);
}
