"""empty message

Revision ID: d59981806edd
Revises: 
Create Date: 2024-08-23 19:14:20.396678

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd59981806edd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('administrator',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=580), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('lastname', sa.String(length=80), nullable=False),
    sa.Column('floor', sa.String(length=80), nullable=False),
    sa.Column('buildingName', sa.String(length=80), nullable=False),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('neighbor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=580), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('lastname', sa.String(length=80), nullable=False),
    sa.Column('floor', sa.String(length=80), nullable=False),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('seller',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=580), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('lastname', sa.String(length=80), nullable=False),
    sa.Column('floor', sa.String(length=80), nullable=False),
    sa.Column('shopName', sa.String(length=80), nullable=False),
    sa.Column('phone', sa.String(length=80), nullable=False),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('building',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('buildingName', sa.String(length=80), nullable=False),
    sa.Column('administrator_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['administrator_id'], ['administrator.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('buyer_name', sa.String(length=80), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('seller_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['seller_id'], ['seller.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('price', sa.Float(precision=30), nullable=False),
    sa.Column('schedule', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('seller_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['seller_id'], ['seller.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recommendation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('lastname', sa.String(length=80), nullable=False),
    sa.Column('phone', sa.String(length=80), nullable=False),
    sa.Column('shopName', sa.String(), nullable=False),
    sa.Column('neighbor_id', sa.Integer(), nullable=True),
    sa.Column('seller_id', sa.Integer(), nullable=True),
    sa.Column('administrator_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['administrator_id'], ['administrator.id'], ),
    sa.ForeignKeyConstraint(['neighbor_id'], ['neighbor.id'], ),
    sa.ForeignKeyConstraint(['seller_id'], ['seller.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['order.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment_text', sa.String(length=255), nullable=True),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('neighbor_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['neighbor_id'], ['neighbor.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('neighbor_id'),
    sa.UniqueConstraint('product_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('review')
    op.drop_table('order_product')
    op.drop_table('recommendation')
    op.drop_table('product')
    op.drop_table('order')
    op.drop_table('building')
    op.drop_table('seller')
    op.drop_table('neighbor')
    op.drop_table('administrator')
    # ### end Alembic commands ###
