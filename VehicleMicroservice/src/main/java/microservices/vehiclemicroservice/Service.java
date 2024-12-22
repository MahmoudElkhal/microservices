package microservices.vehiclemicroservice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@org.springframework.stereotype.Service
public class Service {

    private final Repository vehicleRepository;
    @Autowired
    private final ObjectMapper objectMapper;
    private final Producer producer;

    public Service(Repository vehicleRepository, ObjectMapper objectMapper, Producer producer) {
        this.vehicleRepository = vehicleRepository;
        this.objectMapper = objectMapper;
        this.producer = producer;
    }

    public Vehicle createVehicle(Vehicle vehicle) throws JsonProcessingException {
        vehicleRepository.save(vehicle);
        String vehicleJson = objectMapper.writeValueAsString(vehicle);
        System.out.println("Vehicle created: " + vehicleJson);
        producer.sendMessage("vehicle-added", vehicleJson);
        return vehicle;
    }

    public List<Vehicle> getVehiclesByClientId(UUID clientId) {
        return vehicleRepository.findByClientId(clientId);
    }
}

