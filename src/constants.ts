export const VALIDATION_ERROR_CODE = 400;
export const NOT_FOUND_ERROR_CODE = 404;
export const SERVER_ERROR_CODE = 500;

export const errorText = {
  user: {
    invalidCreateData: 'Переданы некорректные данные при создании пользователя',
    invalidUpdateData: 'Переданы некорректные данные при обновлении профиля',
    invalidUpdateAvatar: 'Переданы некорректные данные при обновлении аватара',
    invalidId: 'Пользователь с указанным _id не найден',
    notFound: 'Пользователь по указанному _id не найден',
  },
  card: {
    invalidCreateData: 'Переданы некорректные данные при создании карточки',
    invalidLikeData: 'Переданы некорректные данные для постановки/снятии лайка',
    invalidId: 'Передан несуществующий _id карточки',
    notFound: 'Карточка с указанным _id не найдена',
  },
  serverFailed: 'На сервере произошла ошибка',
};
