package microservices.maintenancemicroservice;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface Repository extends JpaRepository<Maintenance, UUID> {
    List<Maintenance> findByVehicleId(UUID vehicleId);

    List<Maintenance> findByClientId(UUID clientId);
}

