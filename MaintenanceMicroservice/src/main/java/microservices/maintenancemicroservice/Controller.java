package microservices.maintenancemicroservice;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/maintenance")
public class Controller {

    private final Service maintenanceService;

    public Controller(Service maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @PostMapping
    public ResponseEntity<Maintenance> scheduleMaintenance(@RequestBody Maintenance maintenance) throws JsonProcessingException {
        return ResponseEntity.ok(maintenanceService.scheduleMaintenance(maintenance));
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Maintenance>> getMaintenanceByVehicleId(@PathVariable UUID vehicleId) {
        return ResponseEntity.ok(maintenanceService.getMaintenanceByVehicleId(vehicleId));
    }
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Maintenance>> getMaintenanceByClientId(@PathVariable UUID clientId) {
        return ResponseEntity.ok(maintenanceService.getMaintenanceByClientId(clientId));
    }
}

