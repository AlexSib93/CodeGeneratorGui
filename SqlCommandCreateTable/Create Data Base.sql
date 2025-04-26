DROP TABLE IF EXISTS [ComponentMetadata]
DROP TABLE IF EXISTS [PropMetadata]
DROP TABLE IF EXISTS [FormMetadata]
DROP TABLE IF EXISTS [ProjectMetadata]
DROP TABLE IF EXISTS [ModelMetadata]

CREATE TABLE ModelMetadata 
(
  [IdModelMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [NameSpace] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NOT NULL
)

CREATE TABLE ProjectMetadata 
(
  [IdProjectMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Description] VARCHAR(MAX)   NOT NULL,
  [Path] VARCHAR(MAX)   NOT NULL
)

CREATE TABLE FormMetadata 
(
  [IdFormMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NOT NULL,
  [Description] VARCHAR(MAX)   NOT NULL,
  [AddToNavBar] BIT   NOT NULL,
  [IdProject] INT  REFERENCES ProjectMetadata (IdProjectMetadata) NOT NULL
)

CREATE TABLE PropMetadata 
(
  [IdPropMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Type] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NOT NULL,
  [IdModel] INT  REFERENCES ModelMetadata (IdModelMetadata) NOT NULL
)

CREATE TABLE ComponentMetadata 
(
  [IdComponentMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NOT NULL,
  [Description] VARCHAR(MAX)   NOT NULL,
  [Type] VARCHAR(MAX)   NOT NULL,
  [IdModelPropMetadata] INT  REFERENCES PropMetadata (IdPropMetadata) NOT NULL,
  [ModelProp] BIT   NOT NULL
)
