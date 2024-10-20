const asyncHandler = require("express-async-handler");

export const offset = asyncHandler(
  async (
    model: any,
    page = 1,
    limit = 10,
    filters = null,
    order = null,
    fields = null,
    relation = null
  ) => {
    try {
      const offset = (page - 1) * limit;

      let options = { skip: offset, take: limit } as any;
      if (filters) {
        options.where = filters;
      }
      if (order) {
        options.orderBy = order;
      }
      if (fields) {
        options.select = fields;
      }
      if (relation) {
        options.include = relation;
      }

      let totalCount = {};
      if (filters) {
        totalCount = { where: filters };
      }

      const count = await model.count(totalCount);
      const results = await model.findMany(options);

      return {
        total: count,
        data: results,
        currentPage: page,
        previousPage: page == 1 ? null : page - 1,
        nextPage: page * limit >= count ? null : page + 1,
        lastPage: Math.ceil(count / limit),
        countPerPage: limit,
      };
    } catch (error) {
      console.error("error", error)
    }

  }
);
