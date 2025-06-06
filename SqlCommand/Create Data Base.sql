﻿DROP TABLE IF EXISTS [ComponentMetadata]
DROP TABLE IF EXISTS [PropMetadata]
DROP TABLE IF EXISTS [FormMetadata]
DROP TABLE IF EXISTS [ModelMetadata]
DROP TABLE IF EXISTS [EnumValueMetadata]
DROP TABLE IF EXISTS [EnumMetadata]
DROP TABLE IF EXISTS [ProjectMetadata]

CREATE TABLE ProjectMetadata 
(
  [IdProjectMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Description] VARCHAR(MAX)   NULL,
  [Path] VARCHAR(MAX)   NULL,
  [DbConnectionString] VARCHAR(MAX)   NULL,
  [UnitOfWork] INT   NOT NULL,
  [WebApiHttpsPort] INT   NULL,
  [DevServerPort] INT   NULL
)

CREATE TABLE EnumMetadata 
(
  [IdEnumMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NULL,
  [IdProjectMetadata] INT  REFERENCES ProjectMetadata (IdProjectMetadata) NOT NULL
)

CREATE TABLE EnumValueMetadata 
(
  [IdEnumValueMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NULL,
  [IdEnumMetadata] INT  REFERENCES EnumMetadata (IdEnumMetadata) NOT NULL
)

CREATE TABLE ModelMetadata 
(
  [IdModelMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [InitData] VARCHAR(MAX)   NULL,
  [NameSpace] VARCHAR(MAX)   NULL,
  [Caption] VARCHAR(MAX)   NULL,
  [IdProjectMetadata] INT  REFERENCES ProjectMetadata (IdProjectMetadata) NOT NULL
)

CREATE TABLE FormMetadata 
(
  [IdFormMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NULL,
  [Description] VARCHAR(MAX)   NULL,
  [AddToNavBar] BIT   NOT NULL,
  [IdProjectMetadata] INT  REFERENCES ProjectMetadata (IdProjectMetadata) NOT NULL,
  [IdEditForm] INT  REFERENCES FormMetadata (IdFormMetadata) NOT NULL,
  [IdModel] INT  REFERENCES ModelMetadata (IdModelMetadata) NOT NULL
)

CREATE TABLE PropMetadata 
(
  [IdPropMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Type] VARCHAR(MAX)   NULL,
  [Caption] VARCHAR(MAX)   NULL,
  [Expression] VARCHAR(MAX)   NULL,
  [IdModelMetadata] INT  REFERENCES ModelMetadata (IdModelMetadata) NOT NULL,
  [IsPrimaryKey] BIT   NOT NULL,
  [Visible] BIT   NOT NULL,
  [Editable] BIT   NOT NULL,
  [JsonIgnore] BIT   NOT NULL,
  [PropType] INT   NOT NULL,
  [IsVirtual] BIT   NOT NULL,
  [IsNullable] BIT   NOT NULL,
  [IsEnumerable] BIT   NOT NULL,
  [TypeOfEnumerable] VARCHAR(MAX)   NOT NULL,
  [TypeOfNullable] VARCHAR(MAX)   NOT NULL
)

CREATE TABLE ComponentMetadata 
(
  [IdComponentMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NULL,
  [Caption] VARCHAR(MAX)   NULL,
  [Description] VARCHAR(MAX)   NULL,
  [Type] INT   NOT NULL,
  [TypeString] VARCHAR(MAX)   NOT NULL,
  [IdModelPropMetadata] INT  REFERENCES PropMetadata (IdPropMetadata) NOT NULL,
  [ModelProp] BIT   NOT NULL,
  [IdFormMetadata] INT  REFERENCES FormMetadata (IdFormMetadata) NOT NULL
)
