package microservices.clientinfo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.listener.MessageListenerContainer;
import org.springframework.stereotype.Component;

@Component
public class ListenerManager {
    private final KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry;
    public ListenerManager(KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry) {
        this.kafkaListenerEndpointRegistry = kafkaListenerEndpointRegistry;
    }
    @Bean
    public CommandLineRunner commandLineRunnerBean() {
        return args -> {
            // Start the listener for client-topic
            MessageListenerContainer clientListenerContainer = kafkaListenerEndpointRegistry
                    .getListenerContainer("clientConsumer");
            if (clientListenerContainer != null) {
                clientListenerContainer.start();
                System.out.println("Kafka listener 'clientConsumer' started successfully.");
            } else {
                System.err.println("Listener with ID 'clientConsumer' not found.");
            }
            // Start the listener for vehicle-topic
            MessageListenerContainer vehicleListenerContainer = kafkaListenerEndpointRegistry
                    .getListenerContainer("vehicleConsumer");
            if (vehicleListenerContainer != null) {
                vehicleListenerContainer.start();
                System.out.println("Kafka listener 'vehicleConsumer' started successfully.");
            } else {
                System.err.println("Listener with ID 'vehicleConsumer' not found.");
            }
            // Start the listener for maintenance-topic
            MessageListenerContainer maintenanceListenerContainer = kafkaListenerEndpointRegistry
                    .getListenerContainer("maintenanceConsumer");
            if (maintenanceListenerContainer != null) {
                maintenanceListenerContainer.start();
                System.out.println("Kafka listener 'maintenanceConsumer' started successfully.");
            } else {
                System.err.println("Listener with ID 'maintenanceConsumer' not found.");
            }
        };
    }
}

