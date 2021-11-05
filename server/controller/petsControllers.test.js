const Pet = require("../../database/models/pet");
const { getPets, getPetById } = require("./petsController");

jest.mock("../../database/models/pet");

describe("Given a getPets function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json", async () => {
      const pets = [
        {
          id: 1,
          name: "Lorenzo",
          age: 13,
        },
        {
          id: 2,
          name: "Maki",
          age: 1,
        },
      ];
      Pet.find = jest.fn().mockResolvedValue(pets);
      const res = {
        json: jest.fn(),
      };

      await getPets(null, res);

      expect(Pet.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(pets);
    });
  });
});

describe("Given a getPetById function", () => {
  describe("When it receives a request with an id 3, a res object and a next function", () => {
    test("Then it should invoke Pet.findById with a 3", async () => {
      Pet.findById = jest.fn().mockResolvedValue({});
      const id = 3;
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getPetById(req, res, next);

      expect(Pet.findById).toHaveBeenCalledWith(id);
    });

    describe("And Pet.findById rejects", () => {
      test("Then it should invoke next function with the error rejected", async () => {
        const error = {};
        Pet.findById = jest.fn().mockRejectedValue(error);
        const req = {
          params: {
            id: 0,
          },
        };
        const res = {};
        const next = jest.fn();

        await getPetById(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(error).toHaveProperty("code");
        expect(error.code).toBe(400);
      });
    });

    describe("And Pet.findById resolves to Lorenzo", () => {
      test("Then it should invoke res.json with Lorenzo", async () => {
        const id = 3;
        const lorenzo = {
          id,
          name: "Lorenzo",
          age: 13,
        };
        Pet.findById = jest.fn().mockResolvedValue(lorenzo);
        const req = {
          params: {
            id,
          },
        };
        const res = {
          json: jest.fn(),
        };

        await getPetById(req, res);

        expect(res.json).toHaveBeenCalledWith(lorenzo);
      });
    });
  });
});
