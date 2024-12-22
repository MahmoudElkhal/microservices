package microservices.clientmicroservice;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/client")
public class Controller {

    private final Service clientService;

    public Controller(Service clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client) throws JsonProcessingException {
        System.out.println("Controller"+client.getEmail());
        return ResponseEntity.ok(clientService.createClient(client));

    }

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable UUID id) {
        return ResponseEntity.ok(clientService.getClientById(id));
    }
}

