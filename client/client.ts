import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import type { CrudPda } from "../target/types/crud_pda";

// Configure the client to use the local cluster
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.CrudPda as anchor.Program<CrudPda>;


const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.CrudPda;

async function main() {
  const user = provider.wallet.publicKey;

  const [notePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("note"), user.toBuffer()],
    program.programId
  );

  console.log("PDA:", notePda.toString());

  // CREATE
  await program.methods
    .createNote("Mi primera nota")
    .accounts({
      note: notePda,
      user: user,
    })
    .rpc();

  console.log("Nota creada");

  // READ
  const account = await program.account.note.fetch(notePda);
  console.log("Contenido:", account.content);

  // UPDATE
  await program.methods
    .updateNote("Nota actualizada")
    .accounts({
      note: notePda,
      user: user,
    })
    .rpc();

  console.log("Nota actualizada");

  // DELETE
  await program.methods
    .deleteNote()
    .accounts({
      note: notePda,
      user: user,
    })
    .rpc();

  console.log("Nota eliminada");
}

main();
