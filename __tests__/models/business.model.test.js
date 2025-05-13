const { getAllBusinesses } = require('../../src/models/business.model'); 
const pool = require('../../src/config/db'); 

jest.mock('../../src/config/db', () => ({
  query: jest.fn()
}));

describe('Business Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all businesses from DB', async () => {
    const mockBusinesses = [{ id: 1, name: "Negocio 1" }, { id: 2, name: "Negocio 2" }];
    pool.query.mockResolvedValue({ rows: mockBusinesses });

    const result = await getAllBusinesses();
    
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM business');
    expect(result).toEqual(mockBusinesses);
  });

  it('should handle database errors', async () => {
    pool.query.mockRejectedValue(new Error('DB Error'));
    
    await expect(getAllBusinesses()).rejects.toThrow('DB Error');
  });
});