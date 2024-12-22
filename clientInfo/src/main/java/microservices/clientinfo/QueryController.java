package microservices.clientinfo;

import microservices.clientinfo.entities.Client;
import microservices.clientinfo.entities.Maintenance;
import microservices.clientinfo.entities.Vehicle;
import microservices.clientinfo.repositories.ClientRepository;
import microservices.clientinfo.repositories.MaintenanceRepository;
import microservices.clientinfo.repositories.VehicleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/info")
public class QueryController {

    private final ClientRepository clientRepository;
    private final VehicleRepository vehicleRepository;
    private final MaintenanceRepository maintenanceRepository;

    public QueryController(ClientRepository clientRepository,
                           VehicleRepository vehicleRepository,
                           MaintenanceRepository maintenanceRepository) {
        this.clientRepository = clientRepository;
        this.vehicleRepository = vehicleRepository;
        this.maintenanceRepository = maintenanceRepository;
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> getClient(@PathVariable String id) {
        return clientRepository.findById(UUID.fromString(id))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/vehicles/{id}")
    public ResponseEntity<Vehicle> getVehicle(@PathVariable String id) {
        return vehicleRepository.findById(UUID.fromString(id))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/maintenance/{id}")
    public ResponseEntity<Maintenance> getMaintenance(@PathVariable String id) {
        return maintenanceRepository.findById(UUID.fromString(id))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

