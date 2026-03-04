/*
  Warnings:

  - Added the required column `type` to the `Truck` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADM', 'SUPER_ADM', 'MECANICO');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ABERTA', 'AGUARDANDO_DIAGNOSTICO', 'EM_DIAGNOSTICO', 'DIAGNOSTICO_CONCLUIDO', 'AGUARDANDO_COTACAO', 'EM_COTACAO', 'COTACAO_CONCLUIDA', 'AGUARDANDO_APROVACAO', 'APROVADO', 'REJEITADO', 'AGUARDANDO_PECAS', 'EM_EXECUCAO', 'FINALIZADA', 'ENTREGUE', 'CANCELADA');

-- CreateEnum
CREATE TYPE "CategoriaDiagnostico" AS ENUM ('MOTOR_GERAL', 'MOTOR_NAO_PEGA', 'MOTOR_FALHANDO', 'MOTOR_BATENDO', 'SUPER_AQUECIMENTO', 'BAIXA_PRESSAO_OLEO', 'CONSUMO_EXCESSIVO_OLEO', 'CONSUMO_EXCESSIVO_COMBUSTIVEL', 'VAZAMENTO_OLEO', 'VAZAMENTO_AGUA', 'BOMBA_INJETORA', 'BICOS_INJETORES', 'SISTEMA_COMMON_RAIL', 'FILTRO_COMBUSTIVEL', 'TANQUE_COMBUSTIVEL', 'TURBINA', 'INTERCOOLER', 'SISTEMA_ADMISSAO', 'RADIADOR', 'BOMBA_DAGUA', 'VALVULA_TERMOSTATICA', 'VENTOINHA', 'MANGUEIRAS_ARREFECIMENTO', 'CAMBIO_MANUAL', 'CAMBIO_AUTOMATIZADO', 'SINCRONIZADORES', 'EMBREAGEM', 'ATUADOR_EMBREAGEM', 'CARDAN', 'DIFERENCIAL', 'SISTEMA_FREIO_AR', 'COMPRESSOR_AR', 'VALVULA_PEDAL_FREIO', 'CUICA_FREIO', 'LONA_PASTILHA', 'DISCO_TAMBOR', 'ABS', 'SUSPENSAO_AR', 'AMORTECEDOR', 'MOLA', 'BUCHAS_SUSPENSAO', 'BARRA_ESTABILIZADORA', 'CAIXA_DIRECAO', 'BOMBA_DIRECAO', 'TERMINAL_DIRECAO', 'BARRA_DIRECAO', 'ALTERNADOR', 'MOTOR_PARTIDA', 'BATERIA', 'CHICOTE_ELETRICO', 'MODULO_ELETRONICO', 'PAINEL', 'SENSOR', 'SISTEMA_PNEUMATICO', 'VALVULA_PROTECAO', 'RESERVATORIO_AR', 'VAZAMENTO_GERAL', 'REVISAO_PREVENTIVA', 'OUTROS');

-- AlterTable
ALTER TABLE "Truck" ADD COLUMN     "marca" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles";

-- CreateTable
CREATE TABLE "OrdemService" (
    "id" TEXT NOT NULL,
    "num_os" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "problem_desc_client" TEXT NOT NULL,
    "date_input" TIMESTAMP(3) NOT NULL,
    "date_output" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT NOT NULL,
    "truckId" TEXT NOT NULL,

    CONSTRAINT "OrdemService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnostico" (
    "id" TEXT NOT NULL,
    "problem_desc_fun" TEXT NOT NULL,
    "category" "CategoriaDiagnostico" NOT NULL,
    "prazo_estimado" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ordemServiceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Diagnostico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosticoFoto" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diagnosticoId" TEXT NOT NULL,

    CONSTRAINT "DiagnosticoFoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" TEXT NOT NULL,
    "num_os" TEXT NOT NULL,
    "codigo_peca" TEXT NOT NULL,
    "peca" TEXT NOT NULL,
    "marca_modelo" TEXT NOT NULL,
    "valor_unitario" DOUBLE PRECISION NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "fornecedor" TEXT NOT NULL,
    "prazo_entrega" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ordemServiceId" TEXT NOT NULL,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrdemService_num_os_key" ON "OrdemService"("num_os");

-- AddForeignKey
ALTER TABLE "OrdemService" ADD CONSTRAINT "OrdemService_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemService" ADD CONSTRAINT "OrdemService_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_ordemServiceId_fkey" FOREIGN KEY ("ordemServiceId") REFERENCES "OrdemService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticoFoto" ADD CONSTRAINT "DiagnosticoFoto_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "Diagnostico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_ordemServiceId_fkey" FOREIGN KEY ("ordemServiceId") REFERENCES "OrdemService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
