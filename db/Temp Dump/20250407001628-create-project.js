'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userType: {
        type: DataTypes.ENUM(0,1),
        allowNull: false,
        validate: {
            notNull: {
              msg: 'User Type cannot be null'
          },
          notEmpty: {
            msg: 'User Type cannot be empty' 
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'firstname Type cannot be null'
          },
          notEmpty: {
            msg: 'firstname Type cannot be empty'
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'lastname Type cannot be null'
          },
          notEmpty: {
            msg: 'lastname Type cannot be empty'
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'email Type cannot be null'
          },
          notEmpty: {
            msg: 'email Type cannot be empty'
          },
          isEmail: {
            msg: 'Email format is invalid'
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: 'pass Type cannot be null'
          },
          notEmpty: {
            msg: 'pass Type cannot be empty'
          },
    
        },
      },
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        set(value){
          if(value === this.password) {
            const hashPassword = bycrypt.hashSync(value, 10)
            this.setDataValue('password', hashPassword);
          } else {
            throw new AppError('New and confirmed passwords do not match.',400);
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project');
  }
};