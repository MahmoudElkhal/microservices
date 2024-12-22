package microservices.maintenancemicroservice;

//import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@org.springframework.stereotype.Service
public class Service {
    @Autowired
    private final ObjectMapper objectMapper;
    private final Producer producer;
    private final Repository maintenanceRepository;

    public Service(ObjectMapper objectMapper, Producer producer, Repository maintenanceRepository) {
        this.objectMapper = objectMapper;
        this.producer = producer;
        this.maintenanceRepository = maintenanceRepository;
    }

    public Maintenance scheduleMaintenance(Maintenance maintenance) throws JsonProcessingException {
        maintenanceRepository.save(maintenance);
        String maintainanceJson = objectMapper.writeValueAsString(maintenance);
        System.out.println("Client created: " + maintainanceJson);
        producer.sendMessage("client-added", maintainanceJson);
        return maintenance;
    }

    public List<Maintenance> getMaintenanceByVehicleId(UUID vehicleId) {
        return maintenanceRepository.findByVehicleId(vehicleId);
    }
    public List<Maintenance> getMaintenanceByClientId(UUID clientId) {
        return maintenanceRepository.findByClientId(clientId);
    }
}

