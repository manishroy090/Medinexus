import { Pool, PoolClient } from 'pg';
import { table_prefix } from "../../Constants/App.js";

export const pool = new Pool({
    connectionString: `postgres://manish:secret@localhost:5432/medinexus`
});

export abstract class Model {
    private readonly tableName: string;
    private readonly tablePrefix: string = table_prefix;

    constructor() {
        if (this.constructor.name === "Country") {
            this.tableName = `${this.tablePrefix}_countries`;
        } else {
            this.tableName = `${this.tablePrefix}_${this.constructor.name.toLowerCase()}s`;
        }
    }

    // ─── Core query helper ────────────────────────────────────────────
    // Pass a client to run inside a transaction, or omit to use pool directly
    protected async query<T = any>(
        sql: string,
        params: any[] = [],
        client: PoolClient | null = null
    ): Promise<T[]> {
        const executor = client ?? pool;
        const result = await executor.query(sql, params);
        return result.rows;
    }

    // ─── Transaction wrapper ──────────────────────────────────────────
    async withTransaction<T>(
        callback: (client: PoolClient) => Promise<T>
    ): Promise<T> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

 



  

    

}