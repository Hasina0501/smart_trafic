const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const validator = require("validator");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("./token.service");

const register = async ({ username, email, password }) => {
  if (!validator.isEmail(email)) {
    throw new Error("Email invalide");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.registrationRequest.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const { password: _, ...safeUser } = user;

  return safeUser;
};

const registerSU = async ({ username, email, password }) => {
  if (!validator.isEmail(email)) {
    throw new Error("Email invalide");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.registrationRequest.create({
    data: {
      username,
      email,
      password: hashedPassword,
      Role: "superadmin",
    },
  });

  const { password: _, ...safeUser } = user;

  return safeUser;
};

const login = async ({ email, password }) => {
  if (!validator.isEmail(email)) {
    throw new Error("Email invalide");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Email ou mot de passe incorrect");
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userId: user.id,
    },
  });

  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
};

const refresh = async (refreshToken) => {
  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
    include: {
      user: true,
    },
  });

  if (!storedToken) {
    throw new Error("Refresh token invalide");
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({
      where: {
        id: storedToken.id,
      },
    });

    throw new Error("Refresh token expiré");
  }

  const user = storedToken.user;

  const accessToken = generateAccessToken(user);

  const newRefreshToken = generateRefreshToken();

  await prisma.refreshToken.delete({
    where: {
      id: storedToken.id,
    },
  });

  await prisma.refreshToken.create({
    data: {
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      userId: user.id,
    },
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

const logout = async (refreshToken) => {
  await prisma.refreshToken.deleteMany({
    where: {
      token: refreshToken,
    },
  });
};

module.exports = {
  register,
  registerSU,
  login,
  refresh,
  logout,
};
