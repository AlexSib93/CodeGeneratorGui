DROP TABLE IF EXISTS [ComponentMetadata]
DROP TABLE IF EXISTS [PropMetadata]
DROP TABLE IF EXISTS [FormMetadata]
DROP TABLE IF EXISTS [ModelMetadata]
DROP TABLE IF EXISTS [ProjectMetadata]

CREATE TABLE ProjectMetadata 
(
  [IdProjectMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Description] VARCHAR(MAX)   NOT NULL,
  [Path] VARCHAR(MAX)   NOT NULL,
  [DbConnectionString] VARCHAR(MAX)   NOT NULL,
  [UnitOfWork] VARCHAR(MAX)   NOT NULL
)

CREATE TABLE ModelMetadata 
(
  [IdModelMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [InitData] VARCHAR(MAX)   NOT NULL,
  [NameSpace] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NOT NULL,
  [IdProjectMetadata] INT  REFERENCES ProjectMetadata (IdProjectMetadata) NOT NULL
)

CREATE TABLE FormMetadata 
(
  [IdFormMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NOT NULL,
  [Description] VARCHAR(MAX)   NOT NULL,
  [AddToNavBar] BIT   NOT NULL,
  [IdProjectMetadata] INT  REFERENCES ProjectMetadata (IdProjectMetadata) NOT NULL,
  [IdEditForm] INT  REFERENCES FormMetadata (IdFormMetadata) NOT NULL,
  [IdModel] INT  REFERENCES ModelMetadata (IdModelMetadata) NOT NULL
)

CREATE TABLE PropMetadata 
(
  [IdPropMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Type] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NOT NULL,
  [IdModelMetadata] INT  REFERENCES ModelMetadata (IdModelMetadata) NOT NULL,
  [IsPrimaryKey] BIT   NOT NULL,
  [IsVirtual] BIT   NOT NULL,
  [Visible] BIT   NOT NULL,
  [Editable] BIT   NOT NULL,
  [JsonIgnore] BIT   NOT NULL,
  [IsEnumerable] BIT   NOT NULL,
  [IsMasterProp] BIT   NOT NULL,
  [IsDetailsProp] BIT   NOT NULL,
  [IsDictValueProp] BIT   NOT NULL
)

CREATE TABLE ComponentMetadata 
(
  [IdComponentMetadata] INT IDENTITY PRIMARY KEY  NOT NULL,
  [Name] VARCHAR(MAX)   NOT NULL,
  [Caption] VARCHAR(MAX)   NOT NULL,
  [Description] VARCHAR(MAX)   NOT NULL,
  [Type] VARCHAR(MAX)   NOT NULL,
  [IdModelPropMetadata] INT  REFERENCES PropMetadata (IdPropMetadata) NOT NULL,
  [ModelProp] BIT   NOT NULL,
  [IdFormMetadata] INT  REFERENCES FormMetadata (IdFormMetadata) NOT NULL
)
