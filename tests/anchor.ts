import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { expect } from "chai";
import type { CrudPda } from "../target/types/crud_pda";

describe("crud-pda", () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CrudPda as anchor.Program<CrudPda>;
  

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CrudPda;

  it("Create note", async () => {

    const user = provider.wallet.publicKey;

    const [notePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("note"), user.toBuffer()],
      program.programId
    );

    await program.methods
      .createNote("Hola Solana")
      .accounts({
        note: notePda,
        user: user
      })
      .rpc();

    const account = await program.account.note.fetch(notePda);

    expect(account.content).to.equal("Hola Solana");

  });

});