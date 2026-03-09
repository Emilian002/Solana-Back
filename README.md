# Solana-Back

Programa on-chain desarrollado con **Anchor** sobre **Solana**. Implementa un CRUD de notas usando PDAs (Program Derived Addresses), donde cada wallet tiene exactamente una nota asociada.

## Estructura

```
.
├── programs/
│   └── crud-pda/
│       └── src/
│           └── lib.rs        # lógica del programa
├── client/
│   └── client.ts             # script de interacción manual
├── tests/
│   └── anchor.test.ts        # tests con Mocha/Chai
├── migrations/
├── Anchor.toml
├── Cargo.toml
├── package.json
└── tsconfig.json
```

## Program ID

```
F2rsSZt1fbhzSZtzAdVuqGWwgrUEmxVejtjAM8pbc6YH
```

## PDA

Cada nota se deriva de:

```rust
seeds = [b"note", user.key().as_ref()]
```

Una wallet → una nota. No se pueden tener múltiples notas por usuario.

## Instrucciones

| Instrucción   | Descripción                        |
|---------------|------------------------------------|
| `create_note` | Inicializa la cuenta PDA y guarda el contenido |
| `update_note` | Modifica el contenido de la nota existente |
| `delete_note` | Cierra la cuenta y devuelve el rent al usuario |

## Cuenta

```rust
pub struct Note {
    pub author: Pubkey,   // 32 bytes
    pub content: String,  // máx ~200 bytes
}
```

Space: `8 (discriminator) + 32 (pubkey) + 200 (string)` = 240 bytes.

## Requisitos

- [Rust](https://www.rust-lang.org/tools/install)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor CLI](https://www.anchor-lang.com/docs/installation)
- Node.js >= 18

## Setup

```bash
# instalar dependencias
yarn install

# compilar el programa
anchor build

# levantar validator local
solana-test-validator

# ejecutar tests
anchor test
```

## Tests

```bash
anchor test
```

Verifica que `create_note` guarde correctamente el contenido en la cuenta derivada.

## Client

```bash
# requiere ANCHOR_PROVIDER_URL y ANCHOR_WALLET configurados
npx ts-node client/client.ts
```

Ejecuta el flujo completo: create → read → update → delete.

## Red

Configurado en `Anchor.toml` para **devnet**. Para cambiar a mainnet-beta actualiza:

```toml
[provider]
cluster = "mainnet-beta"
wallet = "~/.config/solana/id.json"
```
