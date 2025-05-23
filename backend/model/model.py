from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base
import enum

class Gender(enum.Enum):
    M = "M"
    F = "F"

class Employees(Base):
    __tablename__ = "employees"
    
    emp_no = Column(Integer, primary_key=True, autoincrement=False)
    birth_date = Column(Date, nullable=False)
    first_name = Column(String(14), nullable=False)
    last_name = Column(String(16), nullable=False)
    gender = Column(Enum(Gender), nullable=False)
    hire_date = Column(Date, nullable=False)
    
    # Relationships
    dept_emp = relationship("DeptEmp", back_populates="employee", cascade="all, delete")
    dept_manager = relationship("DeptManager", back_populates="employee", cascade="all, delete")
    titles = relationship("Titles", back_populates="employee", cascade="all, delete")
    salaries = relationship("Salaries", back_populates="employee", cascade="all, delete")

class Departments(Base):
    __tablename__ = "departments"
    
    dept_no = Column(String(4), primary_key=True)
    dept_name = Column(String(40), nullable=False, unique=True)
    
    # Relationships
    dept_emp = relationship("DeptEmp", back_populates="department", cascade="all, delete")
    dept_manager = relationship("DeptManager", back_populates="department", cascade="all, delete")

class DeptManager(Base):
    __tablename__ = "dept_manager"
    
    emp_no = Column(Integer, ForeignKey("employees.emp_no", ondelete="CASCADE"), primary_key=True)
    dept_no = Column(String(4), ForeignKey("departments.dept_no", ondelete="CASCADE"), primary_key=True)
    from_date = Column(Date, nullable=False)
    to_date = Column(Date, nullable=False)
    
    # Relationships
    employee = relationship("Employees", back_populates="dept_manager")
    department = relationship("Departments", back_populates="dept_manager")

class DeptEmp(Base):
    __tablename__ = "dept_emp"
    
    emp_no = Column(Integer, ForeignKey("employees.emp_no", ondelete="CASCADE"), primary_key=True)
    dept_no = Column(String(4), ForeignKey("departments.dept_no", ondelete="CASCADE"), primary_key=True)
    from_date = Column(Date, nullable=False)
    to_date = Column(Date, nullable=False)
    
    # Relationships
    employee = relationship("Employees", back_populates="dept_emp")
    department = relationship("Departments", back_populates="dept_emp")

class Titles(Base):
    __tablename__ = "titles"
    
    emp_no = Column(Integer, ForeignKey("employees.emp_no", ondelete="CASCADE"), primary_key=True)
    title = Column(String(50), primary_key=True)
    from_date = Column(Date, primary_key=True)
    to_date = Column(Date)
    
    # Relationships
    employee = relationship("Employees", back_populates="titles")

class Salaries(Base):
    __tablename__ = "salaries"
    
    emp_no = Column(Integer, ForeignKey("employees.emp_no", ondelete="CASCADE"), primary_key=True)
    salary = Column(Integer, nullable=False)
    from_date = Column(Date, primary_key=True)
    to_date = Column(Date, nullable=False)
    
    # Relationships
    employee = relationship("Employees", back_populates="salaries")