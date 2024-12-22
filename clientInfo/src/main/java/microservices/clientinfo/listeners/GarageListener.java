package microservices.clientinfo.listeners;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import microservices.clientinfo.entities.Client;
import microservices.clientinfo.entities.Maintenance;
import microservices.clientinfo.entities.Vehicle;
import microservices.clientinfo.repositories.ClientRepository;
import microservices.clientinfo.repositories.MaintenanceRepository;
import microservices.clientinfo.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class GarageListener {
    @Autowired
    public ClientRepository clientRepository;
    @Autowired
    public VehicleRepository vehicleRepository;
    @Autowired
    public MaintenanceRepository maintenanceRepository;

    private final ObjectMapper objectMapper;

    public GarageListener(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @KafkaListener(id = "clientConsumer", topics = "client-topic", autoStartup = "false")
    public void listenToClient(String message) {
        try {
            // Deserialize the JSON string back into a Client object
            Client client = objectMapper.readValue(message, Client.class);
            System.out.println("Received and deserialized client id: " + client.id);

            // Optionally, save the client to the repository again if needed
            clientRepository.save(client);

        } catch (JsonProcessingException e) {
            System.err.println("Error deserializing client message: " + e.getMessage());
        }
    }

    @KafkaListener(id = "vehicleConsumer", topics = "vehicle-topic", autoStartup = "false")
    public void listenToVehicle(String message) {
        try {
            // Deserialize the JSON string back into a Client object
            Vehicle vehicle = objectMapper.readValue(message, Vehicle.class);
            System.out.println("Received and deserialized vehicle id: " + vehicle.id);

            // Optionally, save the client to the repository again if needed
            vehicleRepository.save(vehicle);

        } catch (JsonProcessingException e) {
            System.err.println("Error deserializing vehicle message: " + e.getMessage());
        }
    }

    @KafkaListener(id = "maintenanceConsumer", topics = "maintenance-topic", autoStartup = "false")
    public void listenToMaintenance(String message) {
        try {
            // Deserialize the JSON string back into a Client object
            Maintenance maintenance = objectMapper.readValue(message, Maintenance.class);
            System.out.println("Received and deserialized vehicle id: " + maintenance.id);

            // Optionally, save the client to the repository again if needed
            maintenanceRepository.save(maintenance);

        } catch (JsonProcessingException e) {
            System.err.println("Error deserializing maintenance message: " + e.getMessage());
        }
    }

}
