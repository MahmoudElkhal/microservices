package microservices.clientmicroservice;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@org.springframework.stereotype.Service
//@RequiredArgsConstructor
public class Service {
    @Autowired
    private final ObjectMapper objectMapper;
    private final Producer producer;
    private final Repository clientRepository;

    public Service(Repository customerRepository, ObjectMapper objectMapper, Producer producer) {
        this.clientRepository = customerRepository;
        this.objectMapper = objectMapper;
        this.producer = producer;
    }

    public Client createClient(Client client) throws JsonProcessingException {
        clientRepository.save(client);
        String clientJson = objectMapper.writeValueAsString(client);
        System.out.println("Client created: " + clientJson);
        producer.sendMessage("client-added", clientJson);
        return client;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(UUID id) {
        return clientRepository.findById(id).orElseThrow(() -> new RuntimeException("Client not found"));
    }
}

