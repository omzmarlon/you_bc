package com.youbc.pooling;

public class WeightedStrategy {

    private PoolingStrategy poolingStrategy;
    private Double weight;

    public WeightedStrategy(PoolingStrategy poolingStrategy, Double weight) {
        this.poolingStrategy = poolingStrategy;
        this.weight = weight;
    }

    public PoolingStrategy getPoolingStrategy() {
        return poolingStrategy;
    }

    public Double getWeight() {
        return weight;
    }

}
