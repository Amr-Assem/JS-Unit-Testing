import { User, Admin, getDetails, fetchPost } from './main';

/* ------------------------- Test --> Fetching Data ------------------------- */
describe("Fetching data from JSON placeholder", () => {
    test('fetchPost returns correct JSON structure for a post', async () => {
        const response = await fetchPost(1);

        expect(response.data).toHaveProperty('userId');
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('title');
        expect(response.data).toHaveProperty('body');
    });

    test('fetchPost throws error for invalid response', async () => {
        await expect(fetchPost(99999)).rejects.toThrow('Request failed');
    });
})

/* ---------------- Test --> Instance is of type "something" ---------------- */
describe('User and Admin Classes', () => {
    test('create an instance of User', () => {
        const user = new User('Amr Assem', 'amr@mail.com');
        expect(user).toBeInstanceOf(User);
    });

    test('create an instance of Admin', () => {
        const admin = new Admin('Amr Assem', 'amr@mail.com', 'ADMIN-01');
        expect(admin).toBeInstanceOf(Admin);
    });
});

describe('getDetails', () => {
    test('getDetails returns user details when passed a User instance', () => {
        const user = new User('Amr Assem', 'amr@mail.com');
        const result = getDetails(user);
        expect(result).toBe('Amr Assem (amr@mail.com)');
    });

    test('getDetails returns admin details when passed an Admin instance', () => {
        const admin = new Admin('Amr Assem', 'amr@mail.com', 'ADMIN-01');
        const result = getDetails(admin);
        expect(result).toBe('Admin: Amr Assem (amr@mail.com) - Code: ADMIN-01');
    });

    test('getDetails throws an error when passed an invalid type', () => {
        const user = { name: 'Not Amr Assem :)', email: 'not_amr@mail.com' };
        expect(() => getDetails(user)).toThrow('Invalid user type');
    });

    test('getDetails throws an error when passed a null value', () => {
        expect(() => getDetails(null)).toThrow('Invalid user type');
    });
});
