use anchor_lang::prelude::*;

declare_id!("TU_PROGRAM_ID_AQUI");

#[program]
pub mod crud_pda {
    use super::*;

    pub fn create_note(ctx: Context<CreateNote>, content: String) -> Result<()> {
        let note = &mut ctx.accounts.note;
        note.author = ctx.accounts.user.key();
        note.content = content;
        Ok(())
    }

    pub fn update_note(ctx: Context<UpdateNote>, content: String) -> Result<()> {
        let note = &mut ctx.accounts.note;
        note.content = content;
        Ok(())
    }

    pub fn delete_note(_ctx: Context<DeleteNote>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateNote<'info> {

    #[account(
        init,
        payer = user,
        seeds = [b"note", user.key().as_ref()],
        bump,
        space = 8 + 32 + 4 + 200
    )]
    pub note: Account<'info, Note>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateNote<'info> {

    #[account(
        mut,
        seeds = [b"note", user.key().as_ref()],
        bump,
        constraint = note.author == user.key()
    )]
    pub note: Account<'info, Note>,

    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteNote<'info> {

    #[account(
        mut,
        close = user,
        seeds = [b"note", user.key().as_ref()],
        bump,
        constraint = note.author == user.key()
    )]
    pub note: Account<'info, Note>,

    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct Note {
    pub author: Pubkey,
    pub content: String,
}
