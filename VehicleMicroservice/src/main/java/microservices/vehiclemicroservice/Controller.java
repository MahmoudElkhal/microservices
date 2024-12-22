package microservices.vehiclemicroservice;


import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/vehicle")
public class Controller {
    @Autowired
    private Repository vehicleRepository;
    private final Service vehicleService;

    public Controller(Service vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) throws JsonProcessingException {
        return ResponseEntity.ok(vehicleService.createVehicle(vehicle));
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Vehicle>> getVehiclesByClientId(@PathVariable UUID clientId) {
        return ResponseEntity.ok(vehicleService.getVehiclesByClientId(clientId));
    }
    @GetMapping()
    public ResponseEntity<List<Vehicle>> getAllVehicles(@PathVariable UUID clientId) {
        return ResponseEntity.ok(vehicleRepository.findAll());
    }
}

